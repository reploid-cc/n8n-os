import {
  cn,
  formatCurrency,
  truncateText,
  slugify,
  generateSlug,
  isValidEmail,
  calculateReadingTime,
  formatFileSize,
  generateId,
  safeJsonParse,
} from '../utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500')
      expect(cn('px-2', 'px-4')).toBe('px-4') // Tailwind merge should work
    })
  })

  describe('formatCurrency', () => {
    it('should format VND currency correctly', () => {
      const result = formatCurrency(100000)
      expect(result).toContain('100.000')
      expect(result).toContain('₫')

      const result2 = formatCurrency(1000000)
      expect(result2).toContain('1.000.000')
      expect(result2).toContain('₫')
    })

    it('should format other currencies', () => {
      expect(formatCurrency(100, 'USD')).toContain('100')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncateText(longText, 20)).toBe('This is a very long ...')
    })

    it('should not truncate short text', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 20)).toBe('Short text')
    })
  })

  describe('slugify', () => {
    it('should create slug from Vietnamese text', () => {
      expect(slugify('Tự động hóa workflow')).toBe('tu-ong-hoa-workflow')
      expect(slugify('Hướng dẫn sử dụng n8n')).toBe('huong-dan-su-dung-n8n')
    })

    it('should handle special characters', () => {
      expect(slugify('Test & Demo!')).toBe('test-demo')
      expect(slugify('Multiple   spaces')).toBe('multiple-spaces')
    })
  })

  describe('generateSlug', () => {
    it('should be alias of slugify', () => {
      const text = 'Test workflow'
      expect(generateSlug(text)).toBe(slugify(text))
    })
  })

  describe('isValidEmail', () => {
    it('should validate correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
    })
  })

  describe('calculateReadingTime', () => {
    it('should calculate reading time correctly', () => {
      const shortText = 'This is a short text with about ten words here.'
      expect(calculateReadingTime(shortText)).toBe(1) // Minimum 1 minute

      const longText = 'word '.repeat(400) // 400 words
      expect(calculateReadingTime(longText)).toBe(2) // 400/200 = 2 minutes
    })
  })

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })
  })

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const validJson = '{"key": "value"}'
      expect(safeJsonParse(validJson, {})).toEqual({ key: 'value' })
    })

    it('should return fallback for invalid JSON', () => {
      const invalidJson = 'invalid json'
      const fallback = { error: true }
      expect(safeJsonParse(invalidJson, fallback)).toBe(fallback)
    })
  })
})
