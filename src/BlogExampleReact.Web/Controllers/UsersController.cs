using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogExampleReact.Common.Entities;
using BlogExampleReact.Web.Data;
using BlogExampleReact.Web.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BlogExampleReact.Web.Controllers
{
    public class UsersController: Controller
    {
        private readonly BlogExampleDbContext dbContext;

        public UsersController(BlogExampleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IActionResult Index()
        {
            List<ApplicationUserEntity> users = this.dbContext.Users.ToList();
            return View(users);
        }

        [HttpGet]
        public IActionResult Edit(long? id)
        {
            ApplicationUserEntity entity = id.HasValue
                ? this.dbContext.Users.FirstOrDefault(x => x.Id == id.Value) : new ApplicationUserEntity();

            var assignedRoles = this.dbContext.UserRoles.Where(x => x.UserId == entity.Id);
            List<ApplicationRoleEntity> availableRoles = this.dbContext.Roles.ToList();
            this.ViewBag.AvailableRoles = availableRoles.Select(x=> new SelectListItem
            {
                Value = x.Id.ToString(),
                Text = x.Name,
                Selected = assignedRoles.Any(r=>r.RoleId == x.Id)
            });

            var model = new UserModel
            {
                Id = entity.Id,
                Email = entity.Email
            };
            return View(model);
        }

        [HttpPost]
        public IActionResult Edit(UserModel model)
        {
            var entity = this.dbContext.Users.FirstOrDefault(x => x.Id == model.Id);
            if (entity == null)
            {
                entity = new ApplicationUserEntity();
                this.dbContext.Users.Add(entity);
            }
            var assignedRoles = this.dbContext.UserRoles.Where(x => x.UserId == model.Id);
            foreach (var assignedRole in assignedRoles)
            {
                this.dbContext.UserRoles.Remove(assignedRole);
            }
            this.dbContext.SaveChanges();

            foreach (var modelSelectedRole in model.SelectedRoles)
            {
                ApplicationRoleEntity role = this.dbContext.Roles.FirstOrDefault(x => x.Id == modelSelectedRole);
                this.dbContext.UserRoles.Add(new IdentityUserRole<long>
                {
                    RoleId = role.Id,
                    UserId = model.Id
                });
            }

            this.dbContext.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}
