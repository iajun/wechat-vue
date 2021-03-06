import request from '@/utils/request'

export function addContact(params) {
  return request('put', '/contact', params)
}

export function _setRemark(params) {
  return request('put', '/contact/remark', params)
}

export function _addContactConfig(params) {
  return request('patch', '/contact/config', params)
}
