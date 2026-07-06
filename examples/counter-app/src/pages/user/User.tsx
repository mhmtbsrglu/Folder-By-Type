import Button from "../../components/button/button";
import { useUserService } from "../../hooks/useUserService";

const User = () => {
  const { data, editUser, error, fetchUser, loading } = useUserService();

  return (
    <div>
      {loading && "İstek Gönderiliyor..."}
      <Button
        label="Kullanıcıyı Getir"
        type="warning"
        onClick={() => fetchUser("1")}
      />
      {error && error.message}
      {data && <p>{data.name}</p>}
    </div>
  );
};

export default User;
