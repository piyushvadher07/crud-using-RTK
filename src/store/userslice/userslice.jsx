import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:2000/user')
  return response.data
})
export const fetchSingleUsers = createAsyncThunk('users/fetchUsers', async (id) => {
  const response = await axios.get(`http://localhost:2000/user/${id}`)
  console.log('response', response)
  return response.data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (payload, { dispatch }) => {
  // console.log('payload', payload)
  const response = axios.delete(`http://localhost:2000/user/${payload}`)
  dispatch(fetchUsers())
  return response.data
})


export const newUsers = createAsyncThunk('users/newUsers', async (payload) => {
  console.log('payload', payload)
  const response = await axios.post(`http://localhost:2000/user`, payload)
  return response.data
})

export const editUsers = createAsyncThunk('users/editUsers', async (id) => {
  console.log('id1111111111111', id)
  const response = await axios.put(`http://localhost:2000/user/${id.id}`,id)
  return response.data
})

export const clearAll = createAsyncThunk('users/clearAll', async (payload,{dispatch}) => {
  payload?.forEach( async (element) => {
    const response = await axios.delete(`http://localhost:2000/user/${element?.id}`)
    return response.data
  });
  dispatch(fetchUsers())
})


const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    singleUser:{},
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('action.payload', action.payload)
        if(Array.isArray( action.payload)){
          state.users = action.payload
        }
        else{
          state.singleUser = action.payload
        }
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
      })

    builder
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
      })

    builder
      .addCase(newUsers.pending, state => {
        state.loading = true;
      })
      .addCase(newUsers.fulfilled, (state, action) => {
        // state.users = action.payload
        // state.users = state.users.push(action.payload)
        state.users.push(action.payload);
        // state.users = [...state.users,action.payload]
        state.loading = false;
      })
      .addCase(newUsers.rejected, (state, action) => {
        state.loading = false;
      })
      builder
      .addCase(editUsers.pending, state => {
        state.loading = true;
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        console.log('editUsers.fulfilled', editUsers.fulfilled)
        state.loading = true;
        // state.users = action.payload
        state.loading = false;
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.loading = false;
      })


    // builder
    //   .addCase(fetchSingleUsers.pending, state => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchSingleUsers.fulfilled, (state, action) => {
    //     console.log('fetchSingleUsers.fulfilled', fetchSingleUsers.fulfilled)

    //     state.singleUser = action.payload
    //     state.loading = false;
    //   })
    //   .addCase(fetchSingleUsers.rejected, (state, action) => {
    //     state.loading = false;
    //   })


    

  },
})

export default userSlice.reducer;
// export const {addUser,removeUser,clearAllUser} = userSlice.actions;
