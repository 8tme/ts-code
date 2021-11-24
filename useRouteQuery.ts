import { useLocation } from 'umi'

export default function useRouteQuery <T> () {
  const { query } = useLocation() as unknown as { query: T }

  return query
}
