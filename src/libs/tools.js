export function loopRouteFilter (routeList, access) {
  return routeList.filter(route => {
    const hasAccess = hasRouteAccess(route, access)
    if (hasAccess && route.routes) {
      route.routes = loopRouteFilter(route.routes, access)
    }
    return hasAccess
  })
}

export function hasRouteAccess (route, access) {
  if (route.meta && route.meta.access && !access.includes(route.meta.access)) {
    return false
  }
  return true
}
