export type TRoute = {
  name: string
  query?: Record<string, string>
  params?: Record<string, string>
}

export type TNavigation = {
  title: string
  to: TRoute
}
