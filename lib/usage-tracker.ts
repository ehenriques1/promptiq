// Utility for tracking free usage

export interface UsageData {
  hasUsedFree: boolean
  usageCount: number
  lastUsed: string
  ipAddress?: string
}

const USAGE_KEY = 'promptiq_free_usage'

export class UsageTracker {
  static getUsageData(): UsageData {
    if (typeof window === 'undefined') {
      return { hasUsedFree: false, usageCount: 0, lastUsed: '' }
    }

    try {
      const stored = localStorage.getItem(USAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error reading usage data:', error)
    }

    return { hasUsedFree: false, usageCount: 0, lastUsed: '' }
  }

  static setUsageData(data: UsageData): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(USAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving usage data:', error)
    }
  }

  static markFreeUsage(): void {
    const currentData = this.getUsageData()
    const newData: UsageData = {
      hasUsedFree: true,
      usageCount: currentData.usageCount + 1,
      lastUsed: new Date().toISOString(),
      ipAddress: currentData.ipAddress
    }
    this.setUsageData(newData)
  }

  static hasUsedFree(): boolean {
    return this.getUsageData().hasUsedFree
  }

  static getUsageCount(): number {
    return this.getUsageData().usageCount
  }

  static canUseFree(): boolean {
    return !this.hasUsedFree()
  }

  static resetUsage(): void {
    this.setUsageData({ hasUsedFree: false, usageCount: 0, lastUsed: '' })
  }
}

// API endpoint to check usage from server side
export async function checkServerUsage(): Promise<{ canUseFree: boolean; usageCount: number }> {
  try {
    const response = await fetch('/api/check-usage', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return {
        canUseFree: data.canUseFree,
        usageCount: data.usageCount
      }
    }
  } catch (error) {
    console.error('Error checking server usage:', error)
  }

  // Fallback to client-side check
  return {
    canUseFree: UsageTracker.canUseFree(),
    usageCount: UsageTracker.getUsageCount()
  }
} 