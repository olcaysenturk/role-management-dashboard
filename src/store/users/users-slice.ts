import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, Role } from "@/types/user";
import { UsersState } from "@/types/store";
import { UserService } from "@/services/user-service";

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await UserService.getUsers();
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: Omit<User, "id">) => {
    return await UserService.addUser(userData);
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, role, permissions }: { id: string; role: Role; permissions: string[] }) => {
    return await UserService.updateUser(id, { role, permissions });
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    return await UserService.deleteUser(id);
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.users.unshift(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const usersReducer = usersSlice.reducer;
