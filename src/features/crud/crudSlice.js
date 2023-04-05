import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getplaceholderData, create, editData, deleteData } from "./crudApi";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// async thunks
export const fetchPlaceholderList = createAsyncThunk(
  "crud/fetchPlaceholderList",
  async () => {
    const listData = await getplaceholderData();
    // console.log('list data', listData);
    return listData;
  }
);

export const createData = createAsyncThunk("crud/createData", async (data) => {
  const creates = await create(data);
  return creates;
});

export const changeData = createAsyncThunk(
  "crud/changeData",
  async ({ id, data }) => {
    const edit = await editData(id, data);
    return edit;
  }
);

export const removeData = createAsyncThunk("crud/removeData", async (id) => {
  console.log("id thank", id);
  const DataDelete = await deleteData(id);
  return DataDelete;
});

// create slice
const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state) => {
      state.editing = {};
    },
    trushData: (state, action) => {
        state.isLoading = true;
        let blogs =
        localStorage.getItem("placeholderList") &&
        localStorage.getItem("placeholderList").length > 0
          ? JSON.parse(localStorage.getItem("placeholderList"))
          : [];

      const _blogs = blogs.filter((blog, blogInIndex) => {
        if (blog.id !== action.payload) {
          return blog;
        }
      });
      console.log(_blogs);
      localStorage.setItem("placeholderList", JSON.stringify(_blogs));
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceholderList.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchPlaceholderList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.posts = action.payload;
        localStorage.setItem("placeholderList", JSON.stringify(action.payload));
      })
      .addCase(fetchPlaceholderList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.posts = [];
      })
      .addCase(createData.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const _blogs =
          localStorage.getItem("placeholderList") &&
          localStorage.getItem("placeholderList").length > 0
            ? JSON.parse(localStorage.getItem("placeholderList"))
            : [];
        localStorage.setItem(
          "placeholderList",
          JSON.stringify([..._blogs, action.payload])
        );
      })
      .addCase(createData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(changeData.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeData.fulfilled, (state, action) => {
        console.log("action,", action.payload);
        const { name, email } = action.payload;
        state.isError = false;
        state.isLoading = false;
        let blogs =
          localStorage.getItem("placeholderList") &&
          localStorage.getItem("placeholderList").length > 0
            ? JSON.parse(localStorage.getItem("placeholderList"))
            : [];

        const _blogs = blogs.map((blog, blogInIndex) => {
          if (blog.id == localStorage.getItem("editIndex")) {
            return { name, email };
          } else {
            return blog;
          }
        });
        localStorage.setItem("placeholderList", JSON.stringify(_blogs));
      })
      .addCase(changeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeData.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeData.fulfilled, (state, action) => {
        console.log("action deleted", action);
        state.isError = false;
        state.isLoading = false;
        
      })
      .addCase(removeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default crudSlice.reducer;
export const { editActive, editInActive, trushData } = crudSlice.actions;
