type TableProps<T> = {
  columns: string[];
  data: ({ id: string | number } & T)[];
  rowControls?: (props: { id: string | number } & T) => JSX.Element[];
  rowLeftControls?: (props: { id: string | number } & T) => JSX.Element[];
};

export const Table = <T extends object>({
  rowControls,
  rowLeftControls,
  columns,
  data,
}: TableProps<T>) => {
  const rowControlsElements = rowControls && data.map(rowControls);
  const rowLeftControlsElements = rowLeftControls && data.map(rowLeftControls);

  return (
    <table className="table-auto">
      <thead>
        <tr className="divide-x divide-gray-200 ">
          {rowLeftControls && (
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          )}
          {columns.map((column) => (
            <th
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              title={column}
              key={column}
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
          <tr className="divide-x divide-gray-200" key={row.id}>
            {rowLeftControls && (
              <td className="px-4 py-2 divide-x divide-gray-200 flex gap-2 align-center justify-between text-center">
                {rowLeftControlsElements[index]}
              </td>
            )}
            {columns.map((column) => (
              <td className="px-4 py-2 whitespace-nowrap" key={column}>
                {row[column]}
              </td>
            ))}
            {rowControls && (
              <td className="px-4 py-2 divide-x divide-gray-200 flex gap-2 align-center justify-between text-center">
                {rowControlsElements[index]}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
