/**
 * Data transformation utilities for ETL Pipeline Simulator
 */

// Clean and format name
export function cleanName(name) {
  return name
    .trim()
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Validate email format
export function validateEmail(email) {
  const lowercaseEmail = email.toLowerCase();
  const hasAt = lowercaseEmail.includes('@');
  const hasDot = lowercaseEmail.includes('.');
  return hasAt && hasDot;
}

// Format salary with validation
export function formatSalary(salary) {
  const parsed = parseInt(salary, 10);
  if (isNaN(parsed)) {
    return { value: null, display: '⚠️ Null', isValid: false };
  }
  return {
    value: parsed,
    display: parsed.toLocaleString(),
    isValid: true,
  };
}

// Normalize status
export function normalizeStatus(status) {
  const lowercaseStatus = status.toLowerCase();
  if (lowercaseStatus === 'active') {
    return { value: 'active', display: '✅ Active', isActive: true };
  }
  return { value: 'inactive', display: '❌ Inactive', isActive: false };
}

// Transform a single row
export function transformRow(row) {
  const email = row.email.toLowerCase();
  const isEmailValid = validateEmail(row.email);
  const salary = formatSalary(row.salary);
  const status = normalizeStatus(row.status);

  return {
    id: row.id,
    name: cleanName(row.name),
    email: isEmailValid ? email : '⚠️ Invalid',
    emailValid: isEmailValid,
    salary: salary.display,
    salaryValid: salary.isValid,
    date: '2024-01-15', // Standardized format
    status: status.display,
    statusActive: status.isActive,
  };
}

// Transform entire dataset
export function transformData(data) {
  return data.map(transformRow);
}

// Filter only valid records for loading
export function filterValidRecords(data) {
  return data.filter((row) => row.emailValid);
}

// Get transformation summary
export function getTransformationSummary(original, transformed, loaded) {
  return {
    totalRecords: original.length,
    transformedRecords: transformed.length,
    loadedRecords: loaded.length,
    rejectedRecords: transformed.length - loaded.length,
    successRate: ((loaded.length / original.length) * 100).toFixed(1),
  };
}