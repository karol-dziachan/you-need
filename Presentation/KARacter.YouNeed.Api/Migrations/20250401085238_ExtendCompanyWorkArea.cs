using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class ExtendCompanyWorkArea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "CompanyWorkAreas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkAreas_UserId",
                table: "CompanyWorkAreas",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkAreas_Users_UserId",
                table: "CompanyWorkAreas",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkAreas_Users_UserId",
                table: "CompanyWorkAreas");

            migrationBuilder.DropIndex(
                name: "IX_CompanyWorkAreas_UserId",
                table: "CompanyWorkAreas");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CompanyWorkAreas");
        }
    }
}
