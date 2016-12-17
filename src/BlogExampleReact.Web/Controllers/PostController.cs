using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogExampleReact.Common.Entities;
using BlogExampleReact.Web.Data;
using BlogExampleReact.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogExampleReact.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PostController: Controller
    {
        private readonly BlogExampleDbContext dbContext;

        public PostController(BlogExampleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddOrUpdate([FromBody]PostModel model)
        {
            PostEntity entity = null;
            entity = this.dbContext.Posts.FirstOrDefault(x => x.Id == model.Id);
            if (entity == null)
            {
                entity = new PostEntity {CreateDate = DateTime.Now};
                this.dbContext.Posts.Add(entity);
            }
            entity.Title = model.Title;
            entity.Text = model.Text;
            this.dbContext.SaveChanges();

            var postModel = new PostModel
            {
                Id = entity.Id,
                CreateDate = entity.CreateDate,
                Title = entity.Title,
                Text = entity.Text
            };
            return Json(postModel);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Delete([FromBody]IdModel model)
        {
            PostEntity entity = this.dbContext.Posts.FirstOrDefault(x => x.Id == model.Id);
            this.dbContext.Posts.Remove(entity);
            this.dbContext.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult List()
        {
            var posts = this.dbContext.Posts
                .OrderByDescending(x=>x.CreateDate)
                .ToList().Select(x=> new PostModel
                {
                    Id = x.Id,
                    CreateDate = x.CreateDate,
                    Title = x.Title,
                    Text = x.Text
                });

            return Json(posts);
        }
    }
}
