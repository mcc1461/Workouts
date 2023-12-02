// const Header = (props) => {
//   console.log(props);
//   const { categories, text } = props;
//   return <h1>Header</h1>;
// };

// export default Header;

const Header = ({ categories, text }) => {
  console.log(text);
  return (
    <div>
      <h1>{text}</h1>
      <div>
        {categories.map((item) => (
          <button key={item}>{item}</button>
        ))}
      </div>
    </div>
  );
};

export default Header;
