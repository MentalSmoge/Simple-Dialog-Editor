import { memo } from 'react';
import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';


const columns = [
  {
    accessorKey: 'first',
    header: 'First',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'second',
    header: 'Second',
    cell: (props) => <p>{props.getValue()}</p>
  },

  {
    accessorKey: 'third',
    header: 'Third',
    cell: (props) => <p>{props.getValue()}</p>
  },
]
function ChoiceTable(rows) {
  const table = useReactTable({ rows, columns, getCoreRowModel: getCoreRowModel() })
  return(
    <div className='table'>
      {table.getHeaderGroups().map((headerGroup))}
    </div>
  )
}
export default memo(ChoiceTable)
