export const getOptionsFromMap = (
  map: {
    [p: string | number]: string
  }
) =>
  Object.entries(map)
    .map(
      ([value, label]) => ({ label, value })
    )

export const NOOP = () => { }
export const TimeStamp = () => Date.now() + ''

type TreeNodeType<T> = (T & {
  key: string
  children?: T[]
})

/**
 * 转化为树形列表
 * @param plainArr 平级且满足约束的list
 * @returns 返回树形列表
 */
export function transformToTreeList<ListItemType extends { parentNodeId: string, nodeId: string }> (
  plainArr: ListItemType[] = []
): TreeNodeType<ListItemType>[] {
  if (!plainArr) return []
  // 递归获取
  const getItem = (
    targetObj: ListItemType
  ): TreeNodeType<ListItemType> => {
    const children = plainArr.filter(it => it.parentNodeId === targetObj.nodeId)
    return {
      ...targetObj,
      key: targetObj.nodeId,
      children: children.length > 0 ? children.map(it => getItem(it)) : undefined
    }
  }

  return (
    plainArr
      .filter(it => String(it.parentNodeId) === '-1')
      .map(it => getItem(it))
  )
}
