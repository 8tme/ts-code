import { FormItemProps } from 'antd/lib/form'
import { ColumnType } from 'antd/lib/table'
import { ReactNode } from 'react'

export declare namespace AntdRetype {
  // 表格列配置项
  export type ReColumnsType<T> = Util.Overwrite<ColumnType<T>, {
    dataIndex: keyof T
  }>[]

  // 表单项配置
  export type ReFormItemType<T, U = () => ReactNode> = Util.Overwrite<FormItemProps, {
    name: keyof T
    render?: U
  }>
}
