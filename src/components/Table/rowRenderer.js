import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Default row renderer for Table.
 */
export default function defaultRowRenderer(
  {
    className,
    columns,
    index,
    key,
    onRowClick,
    onRowDoubleClick,
    onRowMouseOut,
    onRowMouseOver,
    onRowRightClick,
    rowData,
    style
  },
  {
    openIndex,
    ExpandedComponent,
    expandedHeight,
    rowHeight,
    expandedRowStyles,
    expandedData,
    tableData
  }
) {
  const a11yProps = {};
  let expandedComponent = null;
  let glyph; // up or down arrow glyph, indicates expanding row

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOut ||
    onRowMouseOver ||
    onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick)
      a11yProps.onClick = event => onRowClick({ event, index, rowData });

    if (onRowDoubleClick)
      a11yProps.onDoubleClick = event =>
        onRowDoubleClick({ event, index, rowData });

    if (onRowMouseOut)
      a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });

    if (onRowMouseOver)
      a11yProps.onMouseOver = event =>
        onRowMouseOver({ event, index, rowData });

    if (onRowRightClick)
      a11yProps.onContextMenu = event =>
        onRowRightClick({ event, index, rowData });
  }
  if (index === openIndex) {
    // current row is selected
    glyph = faChevronUp;
    const data = expandedData ? expandedData : tableData;
    expandedComponent = (
      <div
        style={{
          ...style,
          top: style.top + rowHeight,
          height: expandedHeight
        }}
      >
        <ExpandedComponent expandedData={data[openIndex]} />
      </div>
    );
  } else if (index > openIndex) {
    style.top = style.top + expandedHeight;
  }

  // glyph hasn't been set, this isn't a selected row
  if (glyph === undefined) glyph = faChevronDown;

  // assume column can expand if expandedData is truthy
  let expandVisualAid;
  if (!!expandedData) {
    expandVisualAid = (
      <div style={{ position: 'absolute', right: '1rem' }}>
        <FontAwesomeIcon icon={glyph} />
      </div>
    );
  }

  return (
    <div key={key} style={{}}>
      {' '}
      {/* Empty style object added to remove react-virtualized warning */}
      <div {...a11yProps} className={className} role="row" style={style}>
        {columns}
        {expandVisualAid}
      </div>
      {expandedComponent}
    </div>
  );
}
