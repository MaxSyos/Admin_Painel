import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IcustomersTable } from "../interfaces/Itable";
import { customers, customersHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { BASE_URL, USERS_URL } from "../constantURLs";
import { useGetUsersQuery } from "../slices/usersApiSlice";
const url = `${BASE_URL}${USERS_URL}`
function Customers() {
  const { t } = useTranslation();
  //const { data, error, status } = useFetch<IcustomersTable[]>(url);
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  console.log(users)
  let customerTable;

  if (isLoading) {
    customerTable = <LoadingSpinner />;
  }

  if (error) {
    customerTable = (
      <CustomTable limit={10} headData={customersHeader} bodyData={customers} />
    );
  }

  if (users) {
    customerTable = (
      <CustomTable limit={10} headData={customersHeader} bodyData={users.map(user => ({
        ID: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }))} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("customers")}</h2>
      {customerTable}
    </section>
  );
}

export default Customers;