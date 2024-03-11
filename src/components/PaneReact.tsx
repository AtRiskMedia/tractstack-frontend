const Pane = (props: { id: string }) => {
  //const response = await fetch(`/api/panes/${id}`);
  //console.log(`i am react`, id, response);
  return (
    <div className="h-80 font-bold">
      Pane <span>{props.id}</span>
    </div>
  );
};

export default Pane;
