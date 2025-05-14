import React from 'react';
import Layout from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Upload } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number"
  }),
  productName: z.string().min(2, {
    message: "Product name is required"
  }),
  companyName: z.string().min(2, {
    message: "Company name is required"
  }),
  purchaseDate: z.string().min(1, {
    message: "Purchase date is required"
  }),
  complaintType: z.string().min(1, {
    message: "Please select a complaint type"
  }),
  issueDescription: z.string().min(20, {
    message: "Please provide a detailed description (at least 20 characters)"
  }),
  desiredResolution: z.string().min(10, {
    message: "Please describe your desired resolution"
  }),
  evidenceDescription: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});
type FormValues = z.infer<typeof formSchema>;
const ComplaintForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      productName: "",
      companyName: "",
      purchaseDate: "",
      complaintType: "",
      issueDescription: "",
      desiredResolution: "",
      evidenceDescription: "",
      termsAccepted: false
    }
  });
  const onSubmit = async (data: FormValues) => {
    try {
      // Send data to the backend API
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Complaint Submitted",
          description: `Your complaint has been successfully registered. Reference #${result.complaint_id}`
        });
        form.reset();
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "There was an error submitting your complaint. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error connecting to the server. Please try again later.",
        variant: "destructive"
      });
    }
  };
  return <Layout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-brand-blue-700">Consumer Complaint Form</h1>
        <p className="text-center text-gray-600 mb-8">
          Report issues with products or services and seek resolution
        </p>

        <Alert className="mb-8 bg-brand-blue-50 border-brand-blue-200">
          <AlertCircle className="h-4 w-4 text-brand-blue-600" />
          <AlertTitle className="text-brand-blue-700">Before you submit</AlertTitle>
          <AlertDescription className="text-brand-blue-600">
            Have you tried contacting the company directly? Many issues can be resolved 
            faster by first reaching out to the company's customer service.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Complaint</CardTitle>
            <CardDescription>
              Fill out the form below with details about your consumer complaint. 
              All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="email" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  <FormField control={form.control} name="phone" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Product/Service Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-b pb-2">Product/Service Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="productName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Product/Service Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Smartphone X-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="companyName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Company Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ABC Electronics" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="purchaseDate" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Date of Purchase*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="complaintType" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Complaint Type*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a complaint type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="defectiveProduct">Defective Product</SelectItem>
                              <SelectItem value="misrepresentation">False Advertising/Misrepresentation</SelectItem>
                              <SelectItem value="poorService">Poor Service Quality</SelectItem>
                              <SelectItem value="billing">Billing/Overcharging Issue</SelectItem>
                              <SelectItem value="warranty">Warranty Claim Denied</SelectItem>
                              <SelectItem value="delivery">Delivery Problems</SelectItem>
                              <SelectItem value="refund">Refund Not Processed</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                </div>

                {/* Complaint Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-b pb-2">Complaint Details</h3>
                  
                  <FormField control={form.control} name="issueDescription" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Describe the Issue*</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please provide a detailed description of the issue you experienced..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="desiredResolution" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Desired Resolution*</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What solution are you seeking? (refund, replacement, repair, etc.)" className="min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Evidence */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-b pb-2">Supporting Evidence</h3>
                  
                  <div className="p-4 rounded-md border border-dashed border-gray-300 text-center bg-gray-950">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Upload Files
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">
                      You can upload receipts, photos, correspondence, etc. (Max 5 files, 5MB each)
                    </p>
                  </div>

                  <FormField control={form.control} name="evidenceDescription" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Evidence Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Briefly describe the evidence you're submitting..." className="min-h-[80px]" {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional: Provide context for any files you've uploaded
                        </FormDescription>
                        <FormMessage />
                      </FormItem>} />
                </div>

                {/* Terms and Conditions */}
                <FormField control={form.control} name="termsAccepted" render={({
                field
              }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that all information provided is accurate to the best of my knowledge*
                        </FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our <a href="#" className="text-brand-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-brand-blue-600 hover:underline">Privacy Policy</a>
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>} />

                <Button type="submit" className="w-full bg-brand-blue-600 hover:bg-brand-blue-700">
                  Submit Complaint
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-600 font-semibold mr-3">1</div>
              <div>
                <p className="text-gray-700">Your complaint will be reviewed by our team within 48 hours</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-600 font-semibold mr-3">2</div>
              <div>
                <p className="text-gray-700">We may contact you for additional information or clarification</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-600 font-semibold mr-3">3</div>
              <div>
                <p className="text-gray-700">Your complaint will be forwarded to the relevant company or authority</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-blue-100 flex items-center justify-center text-brand-blue-600 font-semibold mr-3">4</div>
              <div>
                <p className="text-gray-700">You will receive updates on the status of your complaint via email</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default ComplaintForm;