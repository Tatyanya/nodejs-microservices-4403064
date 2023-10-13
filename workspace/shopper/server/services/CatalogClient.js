/** @module CatalogService */

// Import the Item model from mongoose
// const ItemModel = require("../models/Item");
const ServiceClient = require("./ServiceClient");

let allItemsCache = [];

/**
 * Service class for interacting with the Item catalog
 */
class CatalogClient {
  /**
   * Get all items from the database, sorted in descending order by creation time
   * @returns {Promise<Array>} - A promise that resolves to an array of Items
   */
  static async getAll() {
    try {
      const result = await ServiceClient.callService("catalog-service", {
        mthod: "get",
        url: "/items"
      });
      allItemsCache = result;
      return result;
    } catch (error) {
      console.log(error);
      return allItemsCache;
    }
    // return ItemModel.find({}).sort({ createdAt: -1 }).exec();
  }

  /**
   * Get a single item from the database
   * @param {string} itemId - The id of the item to retrieve
   * @returns {Promise<Object>} - A promise that resolves to an Item object
   */
  static async getOne(itemId) {
    try {
      const result = await ServiceClient.callService("catalog-service", {
        method: "get",
        url: `/items/${itemId}`
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
    // return ItemModel.findById(itemId).exec();
  }

  /**
   * Create a new item in the database
   * @param {Object} data - The data for the new item
   * @returns {Promise<Object>} - A promise that resolves to the new Item object
   */
  static async create(data, token) {
    // const item = new ItemModel(data);
    // return item.save();
    try {
      const result = await ServiceClient.callService("catalog-service", {
        mthod: "post",
        url: `/items`,
        data,
        headers: { Authorization: `Baerer ${token}` }
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Update an existing item in the database
   * @param {string} itemId - The id of the item to update
   * @param {Object} data - The new data for the item
   * @returns {Promise<Object|null>} - A promise that resolves to the updated Item object, or null if no item was found
   */
  static async update(itemId, data, token) {
    // return ItemModel.findByIdAndUpdate(itemId, data, { new: true }).exec();
    try {
      const result = await ServiceClient.callService("catalog-service", {
        mthod: "put",
        url: `/item/${itemId}`,
        data,
        headers: { Authorization: `Baerer ${token}` }
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Remove an item from the database
   * @param {string} itemId - The id of the item to remove
   * @returns {Promise<Object>} - A promise that resolves to the deletion result
   */
  static async remove(itemId, token) {
    try {
      const result = await ServiceClient.callService("catalog-service", {
        mthod: "delete",
        url: `/item/${itemId}`,
        headers: { Authorization: `Baerer ${token}` }
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
    // return ItemModel.deleteOne({ _id: itemId }).exec();
  }
}

module.exports = CatalogClient;
