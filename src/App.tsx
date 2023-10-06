import { useRef } from "react";
import Product from "./components/Product";
import useLocalStorage from "./hooks/useLocalStorage";
import { Formik } from "formik";

export type ProductProps = {
  id: string;
  title: string;
  price: number;
};

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useLocalStorage<ProductProps[]>(
    "products",
    []
  );

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <div>
      <div className="container">
        <h1>Products List</h1>
        <table>
          <tr className="header item">
            <th>Product</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
          {products.length ? (
            products.map((product) => (
              <tr className="item">
                <Product
                  key={product.id}
                  {...product}
                  handleDelete={handleDelete}
                />
              </tr>
            ))
          ) : (
            <tr className="item">
              <td colSpan={3} className="text">
                There are no items, Try to add some.
              </td>
            </tr>
          )}
        </table>
        <div className="item">
          <Formik
            initialValues={{ title: "", price: "" }}
            onSubmit={(values, { resetForm }) => {
              setProducts((prev) => [
                {
                  id: Date.now().toString(),
                  title: values.title,
                  price: +values.price,
                },
                ...prev,
              ]);
              resetForm();
              inputRef.current?.focus();
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter product"
                  id="title"
                  onChange={handleChange}
                  value={values.title}
                  required
                  ref={inputRef}
                />
                <div>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    id="price"
                    value={+values.price >= 0 ? values.price : 0}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input type="submit" value="Add" />
              </form>
            )}
          </Formik>
        </div>
        <div>
          <p className="text">Total Price: 0</p>
        </div>
      </div>
    </div>
  );
}
