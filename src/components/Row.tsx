interface RowProps {
  children?: React.ReactNode;
}

const Row = (props: RowProps): JSX.Element => {
  return <div className="row">{props.children}</div>;
};

export default Row;
