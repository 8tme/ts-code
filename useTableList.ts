import { useEffect, useState } from 'react'

/**
 * 获取列表数据逻辑
 * @param initialQuery 初始查询参数
 * @param getListApi 获取列表数据的api接口函数
 * @returns 返回包含两项的数组
 * #### 数组第一项：包含操作函数的对象
 * - 设置查询参数的函数 setListQuery
 * - 刷新列表的函数 refresh
 * #### 数组第二项：包含动态数据的对象
 * - 加载中   loading
 * - 列表数据 tableData
 * - 列表总数 total
 * - 列表查询参数 listQuery
 */
export default function useTableList<
  ListQueryType extends API.Paging,
  ListItemType
> (
  initialQuery: ListQueryType,
  getListApi: (query: ListQueryType) => API.ResListPromise<ListItemType>
): (
  // 返回值类型
  [
    {
      setListQuery: React.Dispatch<React.SetStateAction<ListQueryType>>
      refresh: () => void
    },
    {
      loading: boolean
      tableData: ListItemType[]
      total: number
      listQuery: ListQueryType
    }
  ]
) {
  const [listQuery, setListQuery] = useState<ListQueryType>(initialQuery)
  const [tableData, setTableData] = useState<ListItemType[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    getListApi(listQuery)
      .then(res => {
        setTableData(res?.data.records || [])
        setTotal(res?.data.total || 0)
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false))
  }, [listQuery])

  return [
    {
      setListQuery,
      refresh: () => setListQuery({ ...listQuery })
    },
    {
      loading,
      tableData,
      total,
      listQuery
    }
  ]
}
