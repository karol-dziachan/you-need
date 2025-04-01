using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class ExtendCompanyBreakSettingsv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId1",
                table: "CompanyBreakSettings");

            migrationBuilder.DropIndex(
                name: "IX_CompanyBreakSettings_CompanyId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropIndex(
                name: "IX_CompanyBreakSettings_CompanyId1",
                table: "CompanyBreakSettings");

            migrationBuilder.DropColumn(
                name: "CompanyId1",
                table: "CompanyBreakSettings");

            migrationBuilder.AddColumn<Guid>(
                name: "BreakSettingsId",
                table: "Companies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyBreakSettings_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_BreakSettingsId",
                table: "Companies",
                column: "BreakSettingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_CompanyBreakSettings_BreakSettingsId",
                table: "Companies",
                column: "BreakSettingsId",
                principalTable: "CompanyBreakSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_CompanyBreakSettings_BreakSettingsId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropIndex(
                name: "IX_CompanyBreakSettings_CompanyId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropIndex(
                name: "IX_Companies_BreakSettingsId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "BreakSettingsId",
                table: "Companies");

            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId1",
                table: "CompanyBreakSettings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyBreakSettings_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyBreakSettings_CompanyId1",
                table: "CompanyBreakSettings",
                column: "CompanyId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Companies_CompanyId1",
                table: "CompanyBreakSettings",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");
        }
    }
}
