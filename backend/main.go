package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	// "github.com/24tylerdurden/indian-biased/auth"
	"github.com/24tylerdurden/indian-biased/database"
	"github.com/24tylerdurden/indian-biased/handlers"
	"github.com/24tylerdurden/indian-biased/middleware"
)

func main() {
	if err := database.Init(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer database.Close()

	handlers.InitOAuth()

	router := gin.Default()

	router.Use(middleware.CORSMiddleware())

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	api := router.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/signup", handlers.Signup)
			auth.POST("/login", handlers.Login)
			auth.POST("/google", handlers.GoogleLogin)
			auth.GET("/google/callback", handlers.GoogleCallback)
			auth.POST("/refresh", handlers.RefreshToken)
			auth.POST("/logout", middleware.AuthMiddleware(), handlers.Logout)
			auth.GET("/me", middleware.AuthMiddleware(), handlers.GetMe)
		}

		articles := api.Group("/articles")
		{
			articles.GET("", handlers.GetArticles)
			articles.GET("/:slug", handlers.GetArticleBySlug)
			// articles.GET("/id/:id", handlers.GetArticleById)
			articles.POST("", middleware.AuthMiddleware(), handlers.CreateArticle)
			// articles.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdateArticle)
			// articles.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeleteArticle)
			articles.POST("/:id/publish", middleware.AuthMiddleware(), handlers.PublishArticle)
		}

		perspectives := api.Group("/perspectives")
		{
			perspectives.POST("", middleware.AuthMiddleware(), handlers.CreatePerspective)
			// perspectives.PUT("/:id", middleware.AuthMiddleware(), handlers.UpdatePerspective)
			// perspectives.DELETE("/:id", middleware.AuthMiddleware(), handlers.DeletePerspective)
		}

		categories := api.Group("/categories")
		{
			categories.GET("", handlers.GetCategories)
			categories.POST("", middleware.AuthMiddleware(), handlers.CreateCategory)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
