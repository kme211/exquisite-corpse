export function getUser() {
  console.log('getUser')
  let appData = window.localStorage.getItem('exquisite-corpse')
  if(!appData) return null
  return JSON.parse(appData).user
}

export function setUser(user) {
  let appData = window.localStorage.getItem('exquisite-corpse')
  if(appData) {
    appData = JSON.parse(appData)
  } else {
    appData = { drawings: [] }
  }
  appData = JSON.stringify(Object.assign({}, appData, { user }))
  window.localStorage.setItem('exquisite-corpse', appData)
}
