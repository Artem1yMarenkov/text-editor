import { FastifyPluginCallback } from "fastify"
import { createPostHandler, deletePostHandler, getPostByIdHandler, getPostsByAuthorIdHandler, updatePostHandler } from "./post.controller";
import { CreatePostRouterSchema, DeletePostRouteSchema, GetAllPostRouterSchema, GetOnePostRouterSchema, UpdatePostRouterSchema } from "./post.schemas";

export const postRouter: FastifyPluginCallback = async (app, opts, done) => {
	app.post("/create", {
		schema: CreatePostRouterSchema,
		handler: createPostHandler
	});

	app.get("/all", {
		schema: GetAllPostRouterSchema,
		handler: getPostsByAuthorIdHandler,
	});

	app.get("/:postId", {
		schema: GetOnePostRouterSchema,
		handler: getPostByIdHandler,
	})

	app.delete("/:postId", {
		schema: DeletePostRouteSchema,
		handler: deletePostHandler,
	});

	app.post("/update/:postId", {
		schema: UpdatePostRouterSchema,
        handler: updatePostHandler
	});

	done();
}