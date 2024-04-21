import { useState, useEffect } from "react";
type TableProps<T> = {
  columns: string[];
  data: ({ id: string | number } & T)[];
  rowControls?: (props: { id: string | number } & T) => JSX.Element[];
  rowLeftControls?: (props: { id: string | number } & T) => JSX.Element[];
  onSelectRow?: (selectedRows: number[]) => void;
};

export const Table = <T extends object>({
  rowControls,
  rowLeftControls,
  columns,
  data,
  onSelectRow,
}: TableProps<T>) => {
  const rowControlsElements = rowControls && data.map(rowControls);
  const rowLeftControlsElements = rowLeftControls && data.map(rowLeftControls);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // useEffect(() => {
  //   onSelectRow?.(selectedRows);
  // }, [onSelectRow, selectedRows]);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="divide-x divide-gray-200 ">
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <input
              onChange={(e) => {
                const selectedValues = e.target.checked
                  ? data.map((_, i) => i)
                  : [];
                setSelectedRows(selectedValues);
                onSelectRow?.(selectedValues);
              }}
              checked={selectedRows.length === data.length}
              type="checkbox"
              className="px-4 py-2 divide-x divide-gray-200 flex gap-2 align-center justify-between text-center w-full cursor-pointer"
            />
          </th>
          {rowLeftControls && (
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          )}
          {columns.map((column) => (
            <th
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              title={column}
              key={"vvv" + column}
            >
              {column}
            </th>
          ))}
          {rowControls && (
            <th
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              title="actions"
            >
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr className="divide-x divide-gray-200" key={`${index} b` + row.id}>
            <td>
              <input
                onChange={(e) => {
                  const selectedValues = e.target.checked
                    ? [...selectedRows, index]
                    : selectedRows.filter(
                        (selectedRow) => selectedRow !== index
                      );
                  setSelectedRows(selectedValues);
                  // if (e.target.checked) {
                  //   setSelectedRows([...selectedRows, index]);
                  // } else {
                  //   setSelectedRows(
                  //     selectedRows.filter(
                  //       (selectedRow) => selectedRow !== index
                  //     )
                  //   );
                  // }
                  onSelectRow?.(selectedValues);
                }}
                checked={selectedRows.includes(index)}
                type="checkbox"
                className="px-4 py-2 divide-x divide-gray-200 flex gap-2 align-center justify-between text-center w-full  cursor-pointer"
              />
            </td>
            {rowLeftControls && (
              <td className="px-4 py-2 divide-x divide-gray-200 flex gap-2 align-center justify-between text-center">
                {rowLeftControlsElements[index]}
              </td>
            )}
            {columns.map((column, index) => (
              <td
                className="px-4 py-2 whitespace-nowrap"
                key={`${index} a` + column}
              >
                {row[column]}
              </td>
            ))}
            {rowControls && (
              <td className="px-4 py-2  flex gap-2 align-center justify-between text-center">
                {rowControlsElements[index]}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
