import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLen: 5, message: "TItle should be at least 3 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { 
        required: true,
        message: "Please enter an amount", 
      },
      {
        patttern: /^[1-9]\d*(\.\d+)?$/,
        message: "Please enter a valid number",
      }
    ],
  };

  const Validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLen && value.length < 3) {
          errorData[key] = rule.message;
          return true;
        }
        if(rule.patttern && !rule.patttern.test(value)) {
          errorData[key] = rule.message
          return true
        }
      });
    });

    // if (!formData.title) {
    //   errorData.title = "Title is required";
    // }
    // if (!formData.category) {
    //   errorData.category = "Category is required";
    // }
    // if (!formData.amount) {
    //   errorData.amount = "Amount is required";
    // }

    setErrors(errorData);
    return errorData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = Validate(expense);

    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
    //   const expense = {...getFormData(e.target), id: crypto.randomUUID()}
    //   setExpense((prevState) => [...prevState,expense])
    //   e.target.reset();
    // }
    // const getFormData = (form) => {
    //   const formData = new FormData(form) // to get the data of form
    //   const data = {}
    //   // destructure the dataof form into (key, value) pair
    //   for(const [key, value] of formData.entries()){
    //     data[key] = value
    //   }
    //   return data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select Category"
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
