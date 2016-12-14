using BlogExampleReact.Common.Entities;
using BlogExampleReact.Web.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using NLog.Extensions.Logging;

namespace BlogExampleReact.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true);

            builder.AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();

            services.AddDbContext<BlogExampleDbContext>(options =>
                    options.UseNpgsql(this.Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUserEntity, ApplicationRoleEntity>(o =>
                {
                    o.Password.RequireDigit = false;
                    o.Password.RequireLowercase = false;
                    o.Password.RequireNonAlphanumeric = false;
                    o.Password.RequireUppercase = false;
                    o.Password.RequiredLength = 4;
                })
                .AddEntityFrameworkStores<BlogExampleDbContext, long>()
                .AddDefaultTokenProviders();

            services.AddMvc()
                .AddJsonOptions(options => {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                }); 
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddSwaggerGen();

            //var context = sp.GetService<BlogExampleDbContext>();
            //context.Database.Migrate();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Trace);
            loggerFactory.AddDebug(LogLevel.Trace);
            loggerFactory.AddNLog();

            env.ConfigureNLog("nlog.config");

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseIdentity();

            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");
            });
            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();

            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUi();
        }
    }
}