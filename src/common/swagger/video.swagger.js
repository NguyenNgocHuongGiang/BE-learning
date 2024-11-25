const video = {
  "/video/get-videos/{id}": {
    get: {
      security: [
        {
          bearerToken: [],
        },
      ],
      tags: ["Videos"],
      responses: {
        200: {
          description: "oke",
        },
      },
      parameters: [
        {
          name: "video_id",
          in: "query",
        },
        {
          name: "x-acc",
          in: "header",
        },
        {
            name: "id",
            in: "path",
          },
      ],
    },
  },
  "/video/create-video": {
    post: {
      security: [
        {
          bearerToken: [],
        },
      ],
      tags: ["Videos"],
      responses: {
        200: {
          description: "oke",
        },
      },
      requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        age: {type: "number"},
                        desc: {type: "string"},
                    }
                }
            }
        }
      }
    },
  },
  "/video/update-video": {
    post: {
      security: [
        {
          bearerToken: [],
        },
      ],
      tags: ["Videos"],
      responses: {
        200: {
          description: "oke",
        },
      },
      requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title: {type: "string"},
                        file: {type: "string", format: "binary"},
                        files: {
                            type: "array",
                            items: {
                                type: "string", format: "binary"
                            }
                        }
                    }
                }
            }
        }
      }
    },
  },
};
export default video;
