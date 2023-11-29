import io
import logging


from draftjs_exporter.html import HTML
from xlsxwriter.workbook import Workbook
from draftjs_exporter.constants import ENTITY_TYPES
from draftjs_exporter.dom import DOM

from bs4 import BeautifulSoup, NavigableString

def link(props):
    return DOM.create_element("span", {}, props["children"])


def entity_fallback(props):
    type_ = props["entity"]["type"]
    key = props["entity"]["entity_range"]["key"]
    logging.warning(f'Missing config for "{type_}", key "{key}".')
    return DOM.create_element("span", {"class": "missing-entity"}, props["children"])

config = {
    "entity_decorators": {
        "LINK": link,
        "FALLBACK": entity_fallback,
    }
}

exporter = HTML(config)

def export_writeups(queryset):
    query = queryset.filter(is_staff=False)

    students = []
    for user in query:
        full_name = f"{user.first_name} {user.middle_initial} {user.last_name}"
        id_number = user.username

        writeup = ""
        writeup_status = ""
        try:
            writeup_status = user.writeup.status
            if user.writeup.will_write:
                print(user.writeup.data)
                writeup = exporter.render(user.writeup.data)
                print(writeup)
            else:
                writeup = "<p>No writeup</p>"
        except user._meta.model.writeup.RelatedObjectDoesNotExist:
            writeup = "<p>No writeup</p>"
            writeup_status = "empty"

        students.append(
            {
                "full_name": full_name,
                "id_number": id_number,
                "writeup": writeup,
                "writeup_status": writeup_status,
            }
        )

    #
    output = io.BytesIO()

    workbook = Workbook(output, {"in_memory": True})
    worksheet = workbook.add_worksheet()

    default = workbook.add_format()
    bold = workbook.add_format({"bold": True})
    italic = workbook.add_format({"italic": True})
    underline = workbook.add_format({"underline": True})

    bold_italic = workbook.add_format({"bold": True, "italic": True})
    bold_underline = workbook.add_format({"bold": True, "underline": True})
    italic_underline = workbook.add_format({"underline": True, "italic": True})

    all_formats = workbook.add_format(
        {"bold": True, "italic": True, "underline": True}
    )

    """
    Possible Formats:
    bold (B), italic (I), underline (U)

    B, I, U, BI, BU, IU, BIU 
    
    """

    worksheet.write("A1", "Full Name", bold)
    worksheet.write("B1", "ID Number", bold)
    worksheet.write("C1", "Writeup", bold)
    worksheet.write("D1", "Writeup Status", bold)

    row = 1
    col = 0

    for student in students:
        worksheet.write(row, col, student["full_name"])
        worksheet.write(row, col + 1, student["id_number"])

        soup = BeautifulSoup(student["writeup"], "lxml")

        argument_list = []
        for p in soup.findAll("p"):
            em = False
            strong = False
            u = False
            text = ""
            children = [child for child in p.children]
            if len(children) == 0:
                argument_list.append("\n")
            for child in p.children:
                text = ""
                if child.name == "em":
                    em = True
                elif child.name == "strong":
                    strong = True
                elif child.name == "u":
                    u = True
                if type(child) != NavigableString:
                    for t in child.descendants:
                        if type(t) == NavigableString:
                            text = t
                        else:
                            if t.name == "em":
                                em = True
                            elif t.name == "strong":
                                strong = True
                            elif t.name == "u":
                                u = True
                    if em and strong and u:
                        argument_list.append(all_formats)
                    elif em and strong:
                        argument_list.append(bold_italic)
                    elif em and u:
                        argument_list.append(italic_underline)
                    elif strong and u:
                        argument_list.append(bold_underline)
                    elif strong:
                        argument_list.append(bold)
                    elif u:
                        argument_list.append(underline)
                    elif em:
                        argument_list.append(italic)
                    else:
                        pass

                    argument_list.append(text)
                else:
                    argument_list.append(default)
                    argument_list.append(child)
                    if len(argument_list) <= 2 and (
                        student["writeup_status"] != "approved"
                    ):
                        argument_list.append("\n")
        worksheet.write_rich_string(row, col + 2, *argument_list)
        worksheet.write(row, col + 3, student["writeup_status"])

        row += 1

    workbook.close()

    output.seek(0)
    return output