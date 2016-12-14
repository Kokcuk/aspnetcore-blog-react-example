using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogExampleReact.Common.Entities;
using BlogExampleReact.Web.Data;
using Microsoft.AspNetCore.Mvc;

namespace BlogExampleReact.Web.Controllers
{
    public class RolesController: Controller
    {
        private readonly BlogExampleDbContext dbContext;

        public RolesController(BlogExampleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IActionResult Index()
        {
            List<ApplicationRoleEntity> roles = this.dbContext.Roles.ToList();
            return View(roles);
        }

        [HttpGet]
        public IActionResult Edit(long? id)
        {
            ApplicationRoleEntity entity = id.HasValue
                ? this.dbContext.Roles.FirstOrDefault(x => x.Id == id.Value) : new ApplicationRoleEntity();

            return View(entity);
        }

        [HttpPost]
        public IActionResult Edit(ApplicationRoleEntity model)
        {
            var entity = this.dbContext.Roles.FirstOrDefault(x => x.Id == model.Id);
            if (entity == null)
            {
                entity = new ApplicationRoleEntity();
                this.dbContext.Roles.Add(entity);
            }

            entity.Name = model.Name;

            this.dbContext.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}
