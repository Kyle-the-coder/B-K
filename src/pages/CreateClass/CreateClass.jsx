import { uploadImageToFirebase } from "../../utils/uploadImage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { PostLoader } from "../../components/Loader/PostLoader/PostLoader";
import TiptapEditor from "../../components/TipTap/TiptapEditor";
import { postClassToFirestore } from "../../utils/classApi";
import menu from "../../assets/icons/createIcons/menu.png";
import submit from "../../assets/icons/createIcons/check.png";
import description from "../../assets/icons/createIcons/pencil.png";
import image from "../../assets/icons/createIcons/image.png";
import article from "../../assets/icons/createIcons/info.png";
import redirect from "../../assets/icons/createIcons/two-arrows.png";
import "./createclass.css";

export default function CreateClass() {
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [expandIcons, setExpandIcons] = useState(false);
  const [formArray, setFormArray] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classDate, setClassDate] = useState(null);
  const [classTitle, setClassTitle] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [seriesTitle, setSeriesTitle] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const formIconArray = [
    { img: description, type: "Description", label: "Description" },
    { img: redirect, type: "Redirect", label: "Redirect Link" },
    { img: image, type: "Image", label: "Image Upload" },
  ];

  const handleAddField = (type) => {
    if (type === "Redirect") {
      setFormArray((prev) => [
        ...prev,
        { type, value: { partName: "", partUrl: "" } },
      ]);
    } else {
      setFormArray((prev) => [...prev, { type, value: "" }]);
    }
    setExpandIcons(false);
  };

  const handleChange = (index, content, key = null) => {
    const updated = [...formArray];
    if (key && typeof updated[index].value === "object") {
      updated[index].value = {
        ...updated[index].value,
        [key]: content,
      };
    } else {
      updated[index].value = content;
    }

    setFormArray(updated);

    if (updated[index].type === "Image" && content instanceof File) {
      const previewURL = URL.createObjectURL(content);
      setImagePreviews((prev) => ({ ...prev, [index]: previewURL }));
    }
  };

  const renderFormField = (field, index) => {
    switch (field.type) {
      case "Description":
        return (
          <div
            key={index}
            className="display-column"
            style={{ marginBottom: "100px" }}
          >
            <label
              className="input-label outfit-font"
              style={{ fontSize: "1.5rem" }}
            >
              {field.type}
            </label>
            <TiptapEditor onChange={(val) => handleChange(index, val)} />
          </div>
        );
      case "Redirect":
        return (
          <div
            key={index}
            className="display-column"
            style={{ marginBottom: "100px", padding: "30px 3%" }}
          >
            <label className="input-label outfit-font">Redirect Name</label>
            <input
              className="input"
              type="text"
              value={field.value.name}
              placeholder="e.g. See latest Youtube Video"
              style={{ marginBottom: "30px", padding: "10px 20px" }}
              onChange={(e) => handleChange(index, e.target.value, "partName")}
            />
            <label className="input-label outfit-font">Redirect Url</label>
            <input
              className="input"
              type="url"
              placeholder="e.g. http://youtube.com/videoLink"
              style={{ padding: "10px 20px" }}
              value={field.value.url}
              onChange={(e) => handleChange(index, e.target.value, "partUrl")}
            />
          </div>
        );
      case "Image":
        return (
          <div
            key={index}
            className="display-column"
            style={{ marginBottom: "100px" }}
          >
            <label className="input-label outfit-font">Upload Image</label>
            <input
              className="input-file"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(index, e.target.files[0])}
            />
            {imagePreviews[index] && (
              <img
                src={imagePreviews[index]}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photoInput = document.querySelector('input[type="file"]');
    const flyerFile = photoInput?.files[0];

    const errors = {};
    if (!classTitle) errors.classTitle = true;
    if (!categoryTitle) errors.categoryTitle = true;
    if (!teachers) errors.teachers = true;
    if (categories.length === 0) errors.categories = true;
    if (!flyerFile) errors.flyer = true;
    if (!classDate) errors.classDate = true;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Please fill out all required fields.");
      return;
    }

    setFormErrors({});
    setIsLoading(true);

    try {
      let imgUrl = await uploadImageToFirebase(flyerFile);

      const processedContent = await Promise.all(
        formArray.map(async (field) => {
          if (field.type === "Image" && field.value instanceof File) {
            const uploadedUrl = await uploadImageToFirebase(field.value);
            return { ...field, value: uploadedUrl };
          }
          return field;
        })
      );

      const classPayload = {
        classTitle,
        categoryTitle,
        seriesTitle,
        classDate,
        teachers,
        categories,
        imgUrl,
        content: processedContent,
        datePosted: serverTimestamp(),
      };

      const classId = await postClassToFirestore(classPayload);
      alert(`Class created successfully! ID: ${classId}`);
      navigate("/");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error submitting class:", error);
      alert("Failed to submit class");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="create-class-main">
      <h1 className="outfit-font">Create a Class</h1>
      <div className="display-column">
        <form className="form">
          <div className="input-container">
            <label className="input-label outfit-font">Class Title:</label>
            <input
              className={`input playfair-font ${
                formErrors.classTitle ? "error-border" : ""
              }`}
              type="text"
              onChange={(e) => {
                setClassTitle(e.target.value);
                if (formErrors.classTitle && e.target.value.trim() !== "") {
                  setFormErrors((prev) => ({ ...prev, classTitle: false }));
                }
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Category Title:</label>
            <input
              className={`input playfair-font ${
                formErrors.categoryTitle ? "error-border" : ""
              }`}
              placeholder="e.g. Freestyle/Choreography"
              type="text"
              onChange={(e) => {
                setCategoryTitle(e.target.value);
                if (formErrors.categoryTitle && e.target.value.trim() !== "") {
                  setFormErrors((prev) => ({ ...prev, categoryTitle: false }));
                }
              }}
            />
          </div>

          <div className="input-container">
            <label className="input-label outfit-font">
              Series Title (optional):
            </label>
            <input
              className="input playfair-font"
              type="text"
              placeholder="e.g. Popping Series"
              onChange={(e) => setSeriesTitle(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label outfit-font">Class Date:</label>
            <input
              className={`input playfair-font ${
                formErrors.categoryTitle ? "error-border" : ""
              }`}
              placeholder="e.g. March etc"
              type="text"
              onChange={(e) => {
                setClassDate(e.target.value);
                if (formErrors.classDate && e.target.value.trim() !== "") {
                  setFormErrors((prev) => ({ ...prev, categoryTitle: false }));
                }
              }}
            />
          </div>

          <div className="input-container">
            <label className="input-label outfit-font">Teacher(s):</label>
            <input
              className={`input playfair-font ${
                formErrors.teachers ? "error-border" : ""
              }`}
              type="text"
              onChange={(e) => {
                setTeachers(e.target.value);
                if (formErrors.teachers && e.target.value.trim() !== "") {
                  setFormErrors((prev) => ({ ...prev, teachers: false }));
                }
              }}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Categories:</label>
            <input
              className={`input playfair-font ${
                formErrors.categories ? "error-border" : ""
              }`}
              type="text"
              placeholder="e.g. Choreography, Freestyle, Specific Style"
              onChange={(e) => {
                const value = e.target.value;
                const cats = value
                  .split(",")
                  .map((cat) => cat.trim())
                  .filter((cat) => cat !== "");
                setCategories(cats);
                if (formErrors.categories && cats.length > 0) {
                  setFormErrors((prev) => ({ ...prev, categories: false }));
                }
              }}
            />
            {categories.length > 0 && (
              <div className="category-container outfit-font">
                Categories:
                {categories.map((cat) => (
                  <div key={cat} className="cat silver-bg">
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Flyer:</label>
            <input
              className={`input-file ${formErrors.flyer ? "error-border" : ""}`}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setMainImagePreview(URL.createObjectURL(file));
                  if (formErrors.flyer) {
                    setFormErrors((prev) => ({ ...prev, flyer: false }));
                  }
                }
              }}
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main preview"
                style={{
                  maxWidth: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
          <div className="form-array-container">
            {formArray.map((field, index) => renderFormField(field, index))}
            <div className="add-to-array">
              <img
                className="menu-icon charcoal-bg"
                src={menu}
                onClick={() => setExpandIcons(!expandIcons)}
              />
              {isLoading ? (
                <div className="class-post-loader-container">
                  <PostLoader />
                </div>
              ) : (
                <img
                  className="submit-icon charcoal-bg"
                  src={submit}
                  onClick={handleSubmit}
                />
              )}
              <div className={`expanded-icons ${expandIcons ? "show" : ""}`}>
                {formIconArray.map((icon, index) => (
                  <img
                    key={index}
                    src={icon.img}
                    title={icon.label}
                    className="form-icon"
                    onClick={() => handleAddField(icon.type)}
                  />
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
