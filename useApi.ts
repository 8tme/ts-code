import { useEffect, useState } from 'react'

interface Options<ParamsType, ResultType> {
  // API函数
  api: (params: ParamsType) => API.ResPromise<ResultType>
  // 接口参数
  params: ParamsType
}

export default function useApi<T, U> (options: Options<T, U>) {
  const { api, params } = options

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<U>()

  useEffect(() => {
    setLoading(true)
    api(params)
      .then(res => setData(res.data))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }, [params])

  return {
    loading,
    // 接口响应数据 res.data
    data
  }
}
