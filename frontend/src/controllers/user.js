export function getUser() {
  return JSON.parse(window.localStorage.getItem('exquisite-corpse')).user
}

export function setUser(user) {
  let appData = window.localStorage.getItem('exquisite-corpse')
  if(!appData) appData = {}
  appData = JSON.stringify(Object.assign({}, appData, { user }))
  window.localStorage.setItem('exquisite-corpse', appData)
}
