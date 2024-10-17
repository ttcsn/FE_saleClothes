import { useEffect, useState } from "react";
import {
  deleteImages,
  downloadAllImageFromServerBySpMa,
  updateImageProduct,
  updateProduct,
} from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

function DrawerUpdate({
  isDrawerUpdateOpen,
  closeDrawerUpdate,
  handleCategoryChange,
  category,
  handleChangeSubKeyDm,
  subCategory,
  closeModal,
  productBySpMa,
  dmcMa,
  fetchProduct,
}) {
  const dispatch = useDispatch();
  const imageData = useSelector(
    (state) => state.product.getImageProduct?.currentImageProduct
  );
  const [productName, setProductName] = useState(productBySpMa.spTen);
  const [oldPrice, setOldPrice] = useState(productBySpMa.spGiaCu);
  const [newPrice, setNewPrice] = useState(productBySpMa.spGia);
  const [stock, setStock] = useState(productBySpMa.spSoLuong);
  const [color, setColor] = useState(productBySpMa.spColor);
  const [shortdescription, setShortDescription] = useState(
    productBySpMa.spMoTaNgan
  );
  const [fullDescription, setFullDescription] = useState(
    productBySpMa.spMoTaChiTiet
  );
  const [accessToken, setAccessToken] = useState("");
  const [images, setImages] = useState(null);
  const [files, setFiles] = useState(null);
  const [tempImages, setTempImages] = useState([]);
  const [names, setDeleteImage] = useState([]);

  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
    setDeleteImage([]);
  }, []);
  useEffect(() => {
    if (imageData) {
      setImages(imageData.result);
    }
  }, [imageData]);

  //Handle change=============================================
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleOldPriceChange = (e) => {
    setOldPrice(e.target.value);
  };
  const handleNewPriceChange = (e) => {
    setNewPrice(e.target.value);
  };
  const handleStockChange = (e) => {
    setStock(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };
  const handleFullDescriptionChange = (e) => {
    setFullDescription(e.target.value);
  };
  const handleImageChange = (e) => {
    const newFiles = e.target.files; // Lưu giá trị files tạm thời
    setFiles(newFiles); // Cập nhật state files (tuy nhiên, state vẫn chưa thay đổi ngay lập tức)

    // Chạy vòng lặp trên newFiles thay vì files (bây giờ bạn có thể sử dụng newFiles ngay lập tức)
    Object.keys(newFiles).forEach((file) => {
      setTempImages((prev) => [...prev, newFiles[file]]);
    });
  };

  useEffect(() => {
    downloadAllImageFromServerBySpMa(productBySpMa.spMa, accessToken, dispatch);
  }, []);
  //Handle update product =================================================
  const handleUpdateProduct = async (spMa) => {
    const spNgayCapNhat = new Date().toISOString().split("T")[0];
    const data = {
      spTen: productName,
      spGia: newPrice,
      spGiaCu: oldPrice,
      spMoTaChiTiet: fullDescription,
      spMoTaNgan: shortdescription,
      spNgayCapNhat: spNgayCapNhat,
      spSoLuong: stock,
      spColor: color,
      dmcMa: dmcMa,
    };
    try {
      // Đợi API updateProduct hoàn thành
      await updateProduct(spMa, data, accessToken);
      if (tempImages.length > 0) {
        await updateImageProduct(tempImages, spMa, accessToken);
      }
      
      if (names.length > 0) {
        await deleteImages({names},spMa,accessToken);
      }
      
      // Đóng drawer sau khi update thành công
      closeDrawerUpdate();

      // Fetch lại danh sách sản phẩm sau khi cập nhật thành công
      fetchProduct();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  // Handle remove image ======================================================
  const handleRemoveTempImage = (index) => {
    const newTempImages = [...tempImages];
    newTempImages.splice(index, 1);
    setTempImages(newTempImages);
  };
  const handleRemoveImage = (index) => {
    const imageToDelete = images[index].name; // Lưu lại ảnh cần xóa
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setDeleteImage((prev) => [...prev, imageToDelete]); // Thêm ảnh vào deleteImage
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto "
      onClick={closeModal}
    >
      <form
        action="#"
        id="drawer-update-product"
        className={`mt-5 rounded-md fixed top-0 left-1/2 z-40 w-full max-w-3xl p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 
            ${
              isDrawerUpdateOpen
                ? "translate-x-[-50%] translate-y-0"
                : "-translate-x-full -translate-y-full"
            }`}
        style={{ maxHeight: "90vh" }} // Giới hạn chiều cao tối đa của form
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Update Product
        </h5>
        <button
          onClick={closeDrawerUpdate}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 ">
          <div className="space-y-4 sm:col-span-2 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                value={productName}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
                onChange={handleProductNameChange}
              />
            </div>
            <div>
              <label
                htmlFor="shortdescription"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Short Description
              </label>
              <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                  <textarea
                    id="shortdescription"
                    rows="8"
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write product short description here"
                    required=""
                    value={shortdescription}
                    onChange={handleShortDescriptionChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full description
              </label>
              <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                  <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                    <div className="flex items-center space-x-1 sm:pr-4">
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Embed map</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Format code</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Add emoji</span>
                      </button>
                    </div>
                    <div className="flex-wrap items-center hidden space-x-1 sm:flex sm:pl-4">
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Add list</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Settings</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-tooltip-target="tooltip-fullscreen"
                    className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Full screen</span>
                  </button>
                  <div
                    id="tooltip-fullscreen"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="bottom"
                    style={{
                      position: "absolute",
                      inset: "0px auto auto 0px", // "inset" vẫn được hỗ trợ trong đối tượng style
                      margin: "0px",
                      transform: "translate3d(0px, 335px, 0px)",
                    }}
                  >
                    Show full screen
                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                  <textarea
                    id="description"
                    rows="8"
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write product full description here"
                    required=""
                    value={fullDescription}
                    onChange={handleFullDescriptionChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Images
              </span>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {images?.map((image, index) => (
                  <div
                    key={index}
                    className="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700 "
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={image.imageUrl}
                      alt="imac image"
                    />

                    <button
                      type="button"
                      className="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Remove image</span>
                    </button>
                  </div>
                ))}
                {tempImages.map((tempImage, index) => (
                  <div
                    key={index}
                    className="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700 "
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(tempImage)}
                      alt="imac image"
                    />

                    <button
                      onClick={() => handleRemoveTempImage(index)}
                      type="button"
                      className="absolute text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 bottom-1 left-1"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Remove image</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    multiple
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="product-options"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="product-options"
                className="ml-2 text-sm text-gray-500 dark:text-gray-300"
              >
                Product has multiple options, like different colors or sizes
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                datepicker=""
                id="datepicker"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 datepicker-input"
                value="15/08/2022"
                placeholder="Select date"
              />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Danh Mục
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                {category?.result.map((category) => (
                  <option key={category.dmMa} value={category.dmMa}>
                    {category.dmTen}/{category.dmType}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="subCategory"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loại Sản Phẩm
              </label>
              <select
                onChange={handleChangeSubKeyDm}
                id="object"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select subcatelogy</option>
                {subCategory?.result.map((subCategory) => (
                  <option key={subCategory.dmcMa} value={subCategory.dmcMa}>
                    {subCategory.dmcTen}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="item-weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old price (VND)
              </label>
              <input
                type="number"
                name="oldPrice"
                id="oldPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={oldPrice}
                placeholder="Ex. 12"
                required=""
                onChange={handleOldPriceChange}
              />
            </div>
            <div>
              <label
                htmlFor="newPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Price (VND)
              </label>
              <input
                type="number"
                name="newPrice"
                id="newPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={newPrice}
                placeholder="Ex. 105"
                required=""
                onChange={handleNewPriceChange}
              />
            </div>
            <div>
              <label
                htmlFor="breadth"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={stock}
                placeholder="Ex. 15"
                required=""
                onChange={handleStockChange}
              />
            </div>
            <div>
              <label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={color}
                placeholder="Ex. 23"
                required=""
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
          <button
            onClick={() => handleUpdateProduct(productBySpMa.spMa, accessToken)}
            type="button"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update product
          </button>
          <button
            type="button"
            className="text-red-600 inline-flex justify-center items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-1 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default DrawerUpdate;
