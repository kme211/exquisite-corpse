let lastRoute = null

export function saveRoute(route) {
    lastRoute = route
}

export function getLastRoute() {
    return lastRoute
}