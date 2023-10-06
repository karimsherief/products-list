import { ProductProps } from "../App";
import formatConcurrency from "../utils/formatConcurrency";

export default function Product({
  id,
  title,
  price,
  handleDelete,
}: ProductProps & { handleDelete: (id: string) => void }) {
  return (
    <>
      <td>{title}</td>
      <td>{formatConcurrency(price)}</td>
      <td className="delete" onClick={() => handleDelete(id)}>
        &times;
      </td>
    </>
  );
}
