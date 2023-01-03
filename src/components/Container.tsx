interface ContainerProps {
  children?: React.ReactNode;
}

const Container = (props: ContainerProps): JSX.Element => {
  return (
    <div className="container">
      <div className="container--box">{props.children}</div>
    </div>
  );
};

export default Container;
