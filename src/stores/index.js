import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref([])
  const files = ref([])
  const permits = ref([])
  const logs = ref([])

  // Transaction management
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: uuidv4(),
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending'
    }
    transactions.value.push(newTransaction)
    addLog('transaction_created', `Transaction ${newTransaction.awb || newTransaction.hawb} created`)
    return newTransaction
  }

  const updateTransaction = (id, updates) => {
    const index = transactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      transactions.value[index] = {
        ...transactions.value[index],
        ...updates,
        updatedAt: new Date()
      }
      addLog('transaction_updated', `Transaction ${transactions.value[index].awb || transactions.value[index].hawb} updated`)
    }
  }

  const deleteTransaction = (id) => {
    const index = transactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      const transaction = transactions.value[index]
      transactions.value.splice(index, 1)
      addLog('transaction_deleted', `Transaction ${transaction.awb || transaction.hawb} deleted`)
    }
  }

  // File management
  const addFile = (file) => {
    const newFile = {
      id: uuidv4(),
      ...file,
      uploadedAt: new Date()
    }
    files.value.push(newFile)
    addLog('file_uploaded', `File ${file.name} uploaded`)
    return newFile
  }

  const deleteFile = (id) => {
    const index = files.value.findIndex(f => f.id === id)
    if (index !== -1) {
      const file = files.value[index]
      files.value.splice(index, 1)
      addLog('file_deleted', `File ${file.name} deleted`)
    }
  }

  // Permit management
  const addPermit = (permit) => {
    const newPermit = {
      id: uuidv4(),
      ...permit,
      createdAt: new Date(),
      status: 'pending'
    }
    permits.value.push(newPermit)
    addLog('permit_created', `Permit ${permit.type} created for ${permit.transactionId}`)
    return newPermit
  }

  const updatePermit = (id, updates) => {
    const index = permits.value.findIndex(p => p.id === id)
    if (index !== -1) {
      permits.value[index] = {
        ...permits.value[index],
        ...updates,
        updatedAt: new Date()
      }
      addLog('permit_updated', `Permit ${permits.value[index].type} updated`)
    }
  }

  // Logging
  const addLog = (type, message, data = null) => {
    logs.value.push({
      id: uuidv4(),
      type,
      message,
      data,
      timestamp: new Date()
    })
  }

  // Computed properties
  const activeTransactions = computed(() => 
    transactions.value.filter(t => t.status !== 'completed' && t.status !== 'cancelled')
  )

  const completedTransactions = computed(() => 
    transactions.value.filter(t => t.status === 'completed')
  )

  const pendingPermits = computed(() => 
    permits.value.filter(p => p.status === 'pending' || p.status === 'in_review')
  )

  const todayLogs = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return logs.value.filter(log => {
      const logDate = new Date(log.timestamp)
      logDate.setHours(0, 0, 0, 0)
      return logDate.getTime() === today.getTime()
    })
  })

  return {
    transactions,
    files,
    permits,
    logs,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addFile,
    deleteFile,
    addPermit,
    updatePermit,
    addLog,
    activeTransactions,
    completedTransactions,
    pendingPermits,
    todayLogs
  }
})