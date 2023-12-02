import Header from "./components/header/Header";
import Products from "./components/products/ProductsList";
import { products, categories } from "./helper/data";

function App() {
  console.log(products);
  return (
    <div>
      <Header categories={categories} text="Products List" />
      <Products products={products} />
    </div>
  );
}

export default App;
