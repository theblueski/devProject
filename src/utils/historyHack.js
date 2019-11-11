import store from '../store'
function hackPushState () {
  let pushstate = window.history.pushState
  return function (...args) {
    store.commit('changeRouteLen', 1)
    pushstate.apply(window.history, args)
  }
}

window.history.pushState = hackPushState()

window.addEventListener('popstate', e => {
  store.commit('changeRouteLen', -1)
})
