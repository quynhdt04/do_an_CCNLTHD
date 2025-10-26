import {
  Product,
  ProductListResponse,
  ProductQuery,
} from "@/types/product.type";
import apiService from "./apiService";

class ProductService {
  private endpoint = "/products";

  async getAll(query?: ProductQuery): Promise<ProductListResponse> {
    try {
      const res = await apiService.get<ProductListResponse>(this.endpoint, {
        params: query,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string | number): Promise<Product> {
    try {
      const res = await apiService.get<Product>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async create(productData: Omit<Product, "id">): Promise<Product> {
    try {
      const response = await apiService.post<Product>(
        this.endpoint,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async update(
    id: string | number,
    productData: Partial<Product>
  ): Promise<Product> {
    try {
      const response = await apiService.patch<Product>(
        `${this.endpoint}/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<{ message: string }> {
    try {
      const response = await apiService.delete<{ message: string }>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }

  async search(keyword: string): Promise<Product[]> {
    try {
      const response = await apiService.get<Product[]>(
        `${this.endpoint}/search`,
        {
          params: { q: keyword },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }
}

const productService = new ProductService();
export default productService;
