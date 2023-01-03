type ColumnRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColumnProps {
  s?: ColumnRange;
  m?: ColumnRange;
  l?: ColumnRange;
  children?: React.ReactNode;
}

const Column = (props: ColumnProps): JSX.Element => {
  let className = 'col-s-12';
  if (props.s) {
    className = `col-s-${props.s}`;
  }
  if (props.m) {
    className = className + ' ' + `col-m-${props.m}`;
  }
  if (props.l) {
    className = className + ' ' + `col-l-${props.l}`;
  }

  return <div className={className}>{props.children}</div>;
};

export default Column;
