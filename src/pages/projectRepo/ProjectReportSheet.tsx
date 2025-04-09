import { Project } from "@/components/types/tProject";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
// import { Page, PDFViewer, View } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ReportPDFDocumentStructure from "./ReportPDFDocumentStructure";


const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
  section: { margin: 10, padding: 10, flexGrow: 1 },
});

type Props = DialogProps & {
  projectSelected?: Project;
};

const ProjectReportSheet = ({ onOpenChange, open, ...props }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{props.projectSelected?.projectName}:</SheetTitle>
          <SheetDescription>
            <div className="container mx-auto p-4 flex flex-col">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                <div className="border-t border-gray-300 my-4">
                  <PDFViewer width="100%" height="600">
                    {/* hapa */}
                        <Document>
                            <Page size="A4" style={styles.page}>
                              <View style={styles.section}>
                                <Text>Title: {props.projectSelected?.projectName}</Text>
                                <Text>Client: {props.projectSelected?.projectClient}</Text>
                                <Text>Status: {props.projectSelected?.status}</Text>
                              </View>
                            </Page>
                          </Document>
                    {/* hapa hadi */}
                    {/* <ReportPDFDocumentStructure props={props} /> */}
                  </PDFViewer>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
export default ProjectReportSheet;
