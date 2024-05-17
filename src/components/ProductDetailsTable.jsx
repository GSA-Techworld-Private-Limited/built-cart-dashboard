import React, { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MyContext from "./context/MyContext";
import { formatDateTime } from "./OrdersTable";
const ProductDetailsTables = () => {
  const { productDetailsData } = useContext(MyContext);
  console.log(productDetailsData);
  return (
    <>
      <div className="overflow-auto hide_scroll">
        <div className="w-[calc(1920px-265px)]">
          <div className="bg-[#BDBDBD] h-16 flex gap-[65px] items-center">
            <div className="px-[54px]">
              <Checkbox border="border-dark" />
            </div>
            <div className="flex pl-6 items-center gap-2 w-[244px] -ml-[65px]">
              <p className="font-semibold text-nowrap text-2xl leading-5 text-[#282828]">
                Date
              </p>
            </div>
            <p className="font-semibold text-nowrap pl-6 w-[280px] text-2xl leading-5 text-[#282828]">
              Product
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[280px] text-2xl leading-5 text-[#282828]">
              Price per piece
            </p>
            <p className="font-semibold text-nowrap pl-6 w-[280px] text-2xl leading-5 text-[#282828]">
              Total Orders
            </p>
          </div>
          {productDetailsData &&
            productDetailsData.map((val, i) =>
              val.total_product.map((obj) => (
                <div
                  className={`h-[60px] mt-2 gap-[65px] flex items-center ${
                    i % 2 === 0 ? "bg-[#FEF9EB]" : "bg-white"
                  }`}
                  key={i}
                >
                  <div className="px-[54px] w-[136px]">
                    <Checkbox border="border-[#686868]" />
                  </div>
                  <p className="font-medium pl-6 w-[244px] text-nowrap text-2xl leading-5 text-[#282828] -ml-[65px]">
                    {formatDateTime(obj.created_at)}
                  </p>
                  <p className="font-medium pl-6 w-[280px] text-nowrap text-2xl leading-5 text-[#282828]">
                    {obj.name}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[280px] text-2xl leading-5 text-[#282828]">
                    {obj.selling_price}
                  </p>
                  <p className="font-medium text-nowrap pl-6 w-[280px] text-2xl leading-5 text-[#282828]">
                    {obj.order_products}
                  </p>
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsTables;
