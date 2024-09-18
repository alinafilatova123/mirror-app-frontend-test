import { LayoutI, PostI } from '../interfaces'
import axios from "axios";

const BASE_URL = 'http://localhost:4000';

export const getPosts = async (): Promise<PostI[]> => {
    try {
      const [usersResponse, postsResponse] = await Promise.all([
        axios.get(`${BASE_URL}/users`),
        axios.get(`${BASE_URL}/posts`),
      ]);
  
      const usersMap = usersResponse.data.reduce((acc: any, user: any) => {
        acc[user.postId] = user.username;
        return acc;
      }, {});
  
      return postsResponse.data.map((post: any) => ({
        ...post,
        username: usersMap[post.id],
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const getLayoutSettings = async (): Promise<LayoutI> => {
  try {
    const res = await axios.get(`${BASE_URL}/settings`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};